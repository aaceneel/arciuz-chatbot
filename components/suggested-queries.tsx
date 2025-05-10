"use client"

import { Button } from "@/components/ui/button"

interface SuggestedQueriesProps {
  onSelectQuery: (query: string) => void
}

export function SuggestedQueries({ onSelectQuery }: SuggestedQueriesProps) {
  const suggestedQueries = [
    "How will tensions in the Middle East affect oil token prices?",
    "What tokens perform best during inflation?",
    "Compare tech-backed crypto assets historically.",
    "What happens to crypto during geopolitical crises?",
    "Explain what tokenized stocks are and their risks.",
    "Analyze the current sentiment for Bitcoin.",
  ]

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h3 className="text-sm font-medium mb-3 text-muted-foreground">Try asking about:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestedQueries.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-sm bg-card hover:bg-card/80 hover-glow spring-button"
            onClick={() => onSelectQuery(query)}
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  )
}
